import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogArticlesService } from '../../services/blog/blog-articles.service';
import { CreateArticleDto } from '../../dto/blog/create-article.dto';
import { UpdateArticleDto } from '../../dto/blog/update-article.dto';

@Controller('blog-articles')
export class BlogArticlesController {
  constructor(private readonly blogArticlesService: BlogArticlesService) {}

  @Post()
  async create(@Body() createArticle: CreateArticleDto) {
    return this.blogArticlesService.createArticle(createArticle);
  }

  @Get()
  async getAll() {
    return this.blogArticlesService.getAll();
  }

  @Get('/best')
  async getBestArticles() {
    return this.blogArticlesService.getBestArticles();
  }

  @Get('/main')
  async getMainArticle() {
    return this.blogArticlesService.getMainArticle();
  }

  @Get('/categories')
  async getCategories() {
    return this.blogArticlesService.getCategories();
  }

  @Get('/search/:searchContent')
  async searchArticles(@Param('searchContent') searchContent: string) {
    return this.blogArticlesService.searchArticles(searchContent);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return this.blogArticlesService.getArticleById(+id);
  }

  @Post('/status')
  updateArticleStatus(@Body() body: [id: string, status: string]) {
    return this.blogArticlesService.updateArticleStatus(body);
  }

  @Post('/updateMainArticle')
  updateMainArticle(@Body() body: [id: number]) {
    return this.blogArticlesService.updateMainArticle(body);
  }

  @Post('/update')
  updateArticle(@Body() article: UpdateArticleDto) {
    return this.blogArticlesService.updateArticle(article);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.blogArticlesService.deleteArticle(+id);
  }
}
