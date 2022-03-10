import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogArticlesService } from './blog-articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('blog-articles')
export class BlogArticlesController {
  constructor(private readonly blogArticlesService: BlogArticlesService) {}

  @Post()
  async create(@Body() createArticle: CreateArticleDto) {
    console.log('object', createArticle);
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

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return this.blogArticlesService.getArticleById(+id);
  }

  @Post('/status')
  updateArticleStatus(@Body() body: [id: string, status: string]) {
    return this.blogArticlesService.updateArticleStatus(body);
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
