import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) { }

  generateTags(config) {
    config = {
      title: 'Multiplayer - Tic Tac Toe',
      description: 'Play tic tac toe with your friends',
      image: 'https://i.imgur.com/vSyFEpn.png',
      slug: '',
      ...config
    };

    this.meta.updateTag({ name: 'twitter:card', content: 'Summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@mzainzafar90' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Tic Tac Toe - Socket.IO' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `htt` });

    this.setTitle(config.title);
  }

  private setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
