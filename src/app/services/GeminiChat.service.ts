import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeminiChatService {

  // Pon tu API Key real aquí
  private readonly API_KEY = 'AIzaSyDfrY-PN-RCVUoXzIulrHG53BBgf4mHiEE';

  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + this.API_KEY;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    const body = {
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.GEMINI_API_URL, body, { headers }).pipe(
      map((res: any) => res?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta')
    );
  }
}
