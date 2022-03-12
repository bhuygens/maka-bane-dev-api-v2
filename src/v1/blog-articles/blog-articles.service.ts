import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogArticle } from './blog-articles.entity';
import { Repository } from 'typeorm';
import { BlogCategory } from '../blog-categories/blog-category.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import ErrorManager from '../../.common/utils/ErrorManager';

@Injectable()
export class BlogArticlesService {
  constructor(
    @InjectRepository(BlogArticle)
    private readonly blogArticlesRepository: Repository<BlogArticle>,
    @InjectRepository(BlogCategory)
    private readonly blogCategoriesRepository: Repository<BlogCategory>,
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
      return this.blogArticlesRepository.save(blogArticle);
    } else {
      ErrorManager.notFoundException(
        `Le titre: ${createArticle.title} est déjà utilisé`,
      );
    }
  }

  // GET ALL ARTICLES
  async getAll(): Promise<BlogArticle[]> {
    return await this.blogArticlesRepository.find();
  }

  // GET BEST ARTICLES
  async getBestArticles(): Promise<BlogArticle[]> {
    return await this.blogArticlesRepository.find({ isBestArticle: true });
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
      return await this.blogArticlesRepository.save(article);
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
