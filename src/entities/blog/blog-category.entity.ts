import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogArticle } from './blog-articles.entity';

@Entity('blog_categories')
export class BlogCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string;

  @OneToMany(() => BlogArticle, (blogArticles) => blogArticles.category)
  blogArticles: BlogArticle[];
}
