# Chat Application with WebSocket

Bu proje, **React** ve **FastAPI** kullanarak yapılmış bir gerçek zamanlı sohbet uygulamasıdır. Kullanıcılar, uygulama üzerinden birbirlerine anlık mesaj gönderebilir ve alabilirler. Mesajlaşma işlemi WebSocket protokolü üzerinden gerçekleştirilmiştir.

## Özellikler

- **Gerçek zamanlı sohbet**: Kullanıcılar arasında anlık mesajlaşma.
- **Kullanıcı adı belirleme**: Kullanıcılar bağlandığında kendilerine özel bir kullanıcı adı girerler.
- **Mesajlaşma geçmişi**: Tüm kullanıcılar, uygulamaya katıldıkça geçmiş mesajları görebilirler.
- **WebSocket bağlantısı**: FastAPI WebSocket sunucusu üzerinden her kullanıcıya özel bağlantı kurulur.

## Teknolojiler

- **Frontend**: React, TailwindCSS
- **Backend**: FastAPI, WebSocket
- **WebSocket Library**: `react-use-websocket` (React ile WebSocket entegrasyonu)
 