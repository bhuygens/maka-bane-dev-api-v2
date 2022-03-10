import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogCategory } from '../blog-categories/blog-category.entity';

@Entity('blog_articles')
export class BlogArticle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('timestamptz', { name: 'date' })
  date: Date;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('boolean', {
    name: 'is_best_article',
    nullable: true,
    default: false,
  })
  isBestArticle: boolean;

  @Column('text', { name: 'images_url' })
  imagesUrl: string;

  @Column('text', { name: 'tags', nullable: true, array: true })
  tags: string[];

  @Column('text', { name: 'content_header', nullable: true })
  contentHeader: string;

  @ManyToOne(
    () => BlogCategory,
    (blogCategories) => blogCategories.blogArticles,
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: BlogCategory;
}
