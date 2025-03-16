import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    //salvando no banco de dados
    //save() função nativa do typeorm
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    //buscando no bando de dados 
    //find() função nativa do typeorm
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    //buscando no bando de dados 
    //update() função nativa do typeorm, com dois parametros
    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    //buscando no bando de dados 
    //update() função nativa do typeorm, com um parametros
    await this.usuarioRepository.delete(id);
  }
}
