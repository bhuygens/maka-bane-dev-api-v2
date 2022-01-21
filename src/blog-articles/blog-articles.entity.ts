import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogCategories } from '../blog-categories/blog-categories.entity';

@Entity('blog_articles')
export class BlogArticles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('timestamptz', { name: 'date' })
  date: Date;

  @Column('int', { name: 'category_id' })
  categoryId: number;

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

  @Column('text', { name: 'tags', nullable: true })
  tags: string;

  @Column('text', { name: 'content_header', nullable: true })
  contentHeader: string;

  @ManyToOne(
    () => BlogCategories,
    (blogCategories) => blogCategories.blogArticles,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: BlogCategories;
}
