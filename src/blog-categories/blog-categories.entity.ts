import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogArticles } from '../blog-articles/blog-articles.entity';

@Entity('blog_categories')
export class BlogCategories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string ;

  @OneToMany(() => BlogArticles, (blogArticles) => blogArticles.category)
  blogArticles: BlogArticles[];
}
