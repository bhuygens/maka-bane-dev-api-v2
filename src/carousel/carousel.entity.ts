import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carousel')
export class Carousel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 250 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string;

  @Column('varchar', { name: 'image_url', nullable: true, length: 250 })
  imageUrl: string;

  @Column('varchar', { name: 'article_url', nullable: true, length: 250 })
  articleUrl: string;

  @Column('boolean', { name: 'isOnline', default: false })
  isOnline: number;

  @Column('timestamptz', { name: 'publication_date' })
  publicationDate: Date;
}
