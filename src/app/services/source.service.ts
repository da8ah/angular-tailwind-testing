import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Subject, map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private baseUrl = 'https://rickandmortyapi.com/api/'
  // private data = new Subject<[]>()

  constructor(private http: HttpClient) { }

  getRickAndMortyEpisodes() {
    const page1 = this.http.get(`${this.baseUrl}episode/`)
    const page2 = this.http.get(`${this.baseUrl}episode/?page=2`)
    const page3 = this.http.get(`${this.baseUrl}episode/?page=3`)

    return forkJoin([page1, page2, page3])
      .pipe(map(([page1, page2, page3]: [page1: any, page2: any, page3: any]) => {
        // Merge all episodes
        const episodes = [...page1.results, ...page2.results, ...page3.results]

        // Split by season
        const seasonsTotal = episodes[episodes.length - 1].episode.at(2)
        let seasons: any = []
        Array(Number.parseInt(seasonsTotal)).fill(null).forEach((_, i) => {
          seasons.push(episodes.filter(ep => ep.episode.includes(`S0${i + 1}`)))
        })

        return seasons;
      }))
  }
}
