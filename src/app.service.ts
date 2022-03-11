import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from './common/configuration/models/todo.model';
@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTodos(): Observable<Todo> {
    return this.http
      .get(
        'https://lab3-k8s.corp.ailabs.tw/search-event-api/api/v1/event/search?startDate=2022-02-26&endDate=2022-03-11&sourceLanguage=zh_hant&readerLanguage=zh_hant&sort=datetime&order=desc&after=19.828476,2022-042T18:40:18.138Z',
      )
      .pipe(map((res) => res.data));
  }
}
