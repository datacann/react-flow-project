Project: Ekip ve Kullanıcı Yönetimi Uygulaması
Proje Açıklaması
Bu proje, React, TypeScript ve Vite kullanarak geliştirilmiş bir ekip ve kullanıcı yönetim uygulamasıdır. Kullanıcılar ve ekipler, bir form aracılığıyla eklenebilir, veriler context içerisinde saklanabilir ve görselleştirme için diyagramlar ve grafikler eklenmiştir.

Projenin ana özellikleri şunlardır:

Ekip Oluşturma: Ekipler oluşturulabilir ve yönetilebilir.
Kullanıcı Ekleme: Ekiplerin altına kullanıcılar eklenebilir.
Context Kullanımı: Ekip ve kullanıcı verileri React Context API ile yönetilir.
Diyagram Sayfası: React Flow kullanarak ekipler ve altındaki kullanıcılar bir diyagramda görselleştirilir.
Grafikler Sayfası: Pie Chart ve Bar Chart örnekleri ile grafiksel veri görselleştirme yapılır.
Kullanıcı Ekipten Silme: Kullanıcı, sağ tıklama ile ekipten silinebilir.
Firebase Entegrasyonu: Firebase'e veri gönderme işlemi gerçekleştirilmiştir (isteğe bağlı).
Özellikler
1. Ekip ve Kullanıcı Yönetimi
Kullanıcılar, belirli bir ekip oluşturulduktan sonra bu ekiplerin altına eklenebilir.
Ekipler ve kullanıcılar, React Context API kullanılarak yönetilir.
Ekip node'una sağ tıklama: Ekip node'larına sağ tıklanarak altında bulunan kullanıcılar gösterilip gizlenebilir.
Kullanıcı node'una sağ tıklama: Kullanıcı node'larına sağ tıklayarak, kullanıcı ekipten silinebilir.
2. Diyagram Sayfası - React Flow ile Görselleştirme
Ekipler ve bunlara bağlı kullanıcılar, React Flow kütüphanesi ile dinamik bir diyagramda görselleştirilir.
Kullanıcılar ve ekipler arasındaki ilişkiler görsel olarak sunulur, bağlantılar kolayca takip edilebilir.
3. Charts Sayfası - Pie Chart ve Bar Chart
Grafiklerle ilgili veriler görselleştirilir:
Pie Chart: Kategorik verilerin dağılımı pie chart ile gösterilir.
Bar Chart: Sayısal verilerin karşılaştırılması bar chart ile yapılır.
4. Firebase Entegrasyonu
Firebase, projeye dahil edilmiştir. Veriler Firebase'e gönderilip saklanabilir.
Firebase kurulumu ve entegrasyonu sağlanmıştır, ancak bu özellik isteğe bağlıdır.
Teknolojik Gereksinimler
React: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
TypeScript: JavaScript'in tip güvenli bir versiyonudur.
Vite: Hızlı geliştirme sunucusu ve üretim yapılandırması sağlayan modern bir build aracıdır.
React Flow: Diyagramları ve görselleştirmeleri oluşturmak için kullanılan kütüphane.
Firebase: Verilerin bulutta saklanmasını sağlayan veritabanı hizmetidir.
