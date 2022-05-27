import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../../dto/blog/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogArticle } from '../../entities/blog/blog-articles.entity';
import { Connection, Not, Repository } from 'typeorm';
import { BlogCategory } from '../../entities/blog/blog-category.entity';
import { UpdateArticleDto } from '../../dto/blog/update-article.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { FirebaseHelper } from '../../_shared/helpers/firebase.helper';

@Injectable()
export class BlogArticlesService {
  constructor(
    @InjectRepository(BlogArticle)
    private readonly blogArticlesRepository: Repository<BlogArticle>,
    @InjectRepository(BlogCategory)
    private readonly blogCategoriesRepository: Repository<BlogCategory>,
    private readonly connection: Connection,
  ) {}

  // CREATE ARTICLE
  async createArticle(createArticle: CreateArticleDto) {
    const blogCategory = await this.blogCategoriesRepository.findOne(
      createArticle.categoryId,
    );

    // Find if the name does not exist
    const isArticleExist = await this.blogArticlesRepository.findOne({
      title: createArticle.title,
    });

    if (!isArticleExist) {
      // upload images
      // Check and upload new images
      let uploadedImages: string[] = [];
      if (createArticle.imagesUrl[0].includes('data:image')) {
        // if imagesUrl begin with data:image -> new images to upload
        uploadedImages = await FirebaseHelper.uploadImagesToFirebase(
          createArticle.imagesUrl,
          createArticle.title.replace(/ /g, '_'),
          'article',
        );
        createArticle.imagesUrl = uploadedImages;
      }

      // create new article value
      const blogArticle = this.blogArticlesRepository.create({
        ...createArticle,
        date: new Date(),
        category: blogCategory,
      });

      const createdArticle = await this.blogArticlesRepository.save(
        blogArticle,
      );

      // update other articles -> isMainArticle value
      if (createArticle.isMainArticle) {
        const articlesToUpdated = await this.blogArticlesRepository.find({
          where: {
            id: Not(createdArticle.id),
          },
        });
        if (articlesToUpdated) {
          articlesToUpdated.forEach((art) => {
            art.isMainArticle = false;
          });
          await this.blogArticlesRepository.save(articlesToUpdated);
        }
      }
      return createdArticle;
    } else {
      ErrorManager.notFoundException(
        `Le titre: ${createArticle.title} est déjà utilisé`,
      );
    }
  }

  // GET ALL ARTICLES
  async getAll(): Promise<BlogArticle[]> {
    return this.blogArticlesRepository.find({
      order: {
        date: 'ASC',
      },
    });
  }

  // GET ALL ARTICLES
  async getMainArticle(): Promise<BlogArticle[]> {
    return this.blogArticlesRepository.find({
      where: {
        isMainArticle: true,
      },
    });
  }

  // GET ALL ARTICLES
  async getCategories(): Promise<BlogCategory[]> {
    return this.blogCategoriesRepository.find();
  }

  // GET BEST ARTICLES
  async getBestArticles(): Promise<any> {
    try {
      return await this.blogArticlesRepository
        .createQueryBuilder('blogArticles')
        .where('blogArticles.isBestArticle = :name', { name: 'true' })
        .leftJoinAndSelect('blogArticles.category', 'categories')
        .getMany();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  // GET ARTICLE BY ID
  async getArticleById(id: number): Promise<BlogArticle> {
    return this.blogArticlesRepository.findOne(id);
  }

  // UPDATE ARTICLE STATUS
  async updateArticleStatus(
    body: [id: string, status: string],
  ): Promise<BlogArticle> {
    const article = await this.blogArticlesRepository.findOne(body['id']);

    if (article) {
      article.isBestArticle = body['status'] === true;
      return this.blogArticlesRepository.save(article);
    } else {
      ErrorManager.notFoundException(`blog article not found`);
    }
  }

  // UPDATE ARTICLE STATUS
  async updateMainArticle(body: [id: number]): Promise<BlogArticle> {
    const article = await this.blogArticlesRepository.findOne({
      where: {
        id: body['id'],
      },
    });

    if (article) {
      article.isMainArticle = true;

      const articles = await this.blogArticlesRepository.find({
        where: {
          id: Not(body['id']),
        },
      });

      if (articles) {
        articles.forEach((art) => {
          art.isMainArticle = false;
        });
        await this.blogArticlesRepository.save(articles);
      }

      return this.blogArticlesRepository.save(article);
    } else {
      ErrorManager.notFoundException(`blog article not found`);
    }
  }

  // UPDATE ARTICLE CONTENT
  async updateArticle(articleContent: UpdateArticleDto): Promise<BlogArticle> {
    console.log(articleContent);
    const article = await this.blogArticlesRepository.preload({
      id: +articleContent.id,
      ...articleContent,
    });
    if (article) {
      // Check and upload new images
      let uploadedImages: string[] = [];
      if (articleContent.imagesUrl[0].includes('data:image')) {
        // if imagesUrl begin with data:image -> new images to upload
        uploadedImages = await FirebaseHelper.uploadImagesToFirebase(
          articleContent.imagesUrl,
          articleContent.title.replace(/ /g, '_'),
          'article',
        );
      }
      // update imagesUrl
      article.imagesUrl = [...articleContent.updatedImages];
      // add new images upload url
      if (uploadedImages.length > 0) {
        article.imagesUrl.push(...uploadedImages);
      }
      console.log(article);
      return this.blogArticlesRepository.save(article);
    } else {
      ErrorManager.notFoundException(`article ${articleContent.id} not found`);
    }
  }

  // DELETE ARTICLE
  async deleteArticle(id: number): Promise<{ success: boolean }> {
    const article = await this.blogArticlesRepository.findOne(id);
    if (article) {
      await this.blogArticlesRepository.remove(article);
      return {
        success: true,
      };
    } else {
      ErrorManager.notFoundException(`article ${id} not found`);
    }
  }

  // DELETE ARTICLE
  async searchArticles(
    searchContent: string,
  ): Promise<{ success: boolean; articles: BlogArticle[] }> {
    const articles = await this.blogArticlesRepository
      .createQueryBuilder('article')
      .where('article.title like :blogTitle', {
        blogTitle: `%${searchContent}%`,
      })
      .orWhere('article.content_header like :contentHeader', {
        contentHeader: `%${searchContent}%`,
      })
      .getMany();

    if (articles.length > 0) {
      return {
        articles,
        success: true,
      };
    } else {
      return {
        success: false,
        articles: null,
      };
    }
  }
}
