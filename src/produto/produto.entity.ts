import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { FornecedorEntity } from '../fornecedor/fornecedor.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  //um para muitos
  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImageEntity) => produtoImageEntity.produto,
    { cascade: true, eager: true, nullable: true },
  )
  imagens: ProdutoImagemEntity[];

  //um para muitos
  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    { cascade: true, eager: true, nullable: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  //Utilizando a funcao cascade
  @ManyToOne(
    () => FornecedorEntity, (fornecedor) => fornecedor.produtos, 
    { nullable: true, cascade: false, eager: true }
  )
  fornecedor: FornecedorEntity;
}
