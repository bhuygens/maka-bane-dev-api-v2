import { Injectable } from '@nestjs/common';
import CreateBlogCategoryDto from '../../dto/blog/create-blog-category.dto';
import { BlogCategory } from '../../entities/blog/blog-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { BlogArticle } from '../../entities/blog/blog-articles.entity';

@Injectable()
export class BlogCategoriesService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
    @InjectRepository(BlogArticle)
    private readonly blogArticlesRepository: Repository<BlogArticle>,
  ) {}

  async create(blogCategory: CreateBlogCategoryDto): Promise<BlogCategory> {
    const category = await this.blogCategoryRepository.findOne({
      name: blogCategory.name,
    });

    if (!category) {
      const newCategory = this.blogCategoryRepository.create(blogCategory);
      return await this.blogCategoryRepository.save(newCategory);
    } else {
      ErrorManager.alreadyExistContentException(`article name already exist`);
    }
  }

  async delete(id: number): Promise<BlogCategory> {
    const articleCategory = await this.blogCategoryRepository.findOne(id);
    const articles = await this.blogArticlesRepository.find({
      category: articleCategory,
    });

    if (articles.length > 0) {
      const ids = [];
      articles.forEach((article: BlogArticle) => ids.push(article.id));
      ErrorManager.alreadyExistContentException(
        `Veuillez supprimer les articles suivant avant de supprimer la catégorie : ${ids.toString()}`,
      );
    } else {
      return await this.blogCategoryRepository.remove(articleCategory);
    }
  }

  async getArticlesByCategoryId(id: number): Promise<BlogArticle[]> {
    const category = await this.blogCategoryRepository.findOne(id);
    return this.blogArticlesRepository.find({ category: category });
  }
}
