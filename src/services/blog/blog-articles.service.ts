import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../../dto/blog/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogArticle } from '../../entities/blog/blog-articles.entity';
import { Connection, Not, Repository } from 'typeorm';
import { BlogCategory } from '../../entities/blog/blog-category.entity';
import { UpdateArticleDto } from '../../dto/blog/update-article.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';

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
    const blogCategory = await this.blogCategoriesRepository.findOne(1);

    // Find if the name does not exist
    const isArticleExist = await this.blogArticlesRepository.findOne({
      title: createArticle.title,
    });

    if (!isArticleExist) {
      const blogArticle = this.blogArticlesRepository.create({
        ...createArticle,
        date: new Date(),
      });

      const createdArticle = await this.blogArticlesRepository.save(
        blogArticle,
      );
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

      return createdArticle;
    } else {
      ErrorManager.notFoundException(
        `Le titre: ${createArticle.title} est déjà utilisé`,
      );
    }
  }

  // GET ALL ARTICLES
  async getAll(): Promise<BlogArticle[]> {
    return await this.blogArticlesRepository.find({
      order: {
        date: 'ASC',
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
    return await this.blogArticlesRepository.findOne(id);
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
    const article = await this.blogArticlesRepository.preload({
      id: +articleContent.id,
      ...articleContent,
    });
    if (!article) {
      ErrorManager.notFoundException(`article ${articleContent.id} not found`);
    }
    return this.blogArticlesRepository.save(article);
  }

  // DELETE ARTICLE
  async deleteArticle(id: number): Promise<BlogArticle> {
    const article = await this.blogArticlesRepository.findOne(id);
    if (article) {
      return await this.blogArticlesRepository.remove(article);
    } else {
      ErrorManager.notFoundException(`article ${id} not found`);
    }
  }
}
