const admin = require('firebase-admin');

const config = {
  type: 'service_account',
  project_id: 'pratos-limpos-dev',
  private_key_id: '604ceb8f125801cf0e34eb8ca9e08debdf534f5e',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/HPTGZrj2DM8u\nkG7O3SbDaiZ1ZimOzZN+et18QM02SyftuMB6f5BTyUcKOCgTBkRLTPGo9OWgOccN\nZLpXkn9tprR5HdDwHHT15ocgFAE1OpUDfUeFt6Mktf946Q4dyVrjvhvzTQNXZtt3\nydGyL5zeFny4MCic6rGJbDIZjVH+pQ4NPr2nFAKoKkyDQQhIE0DMjnC2ihvLHH2Z\nlU9QMq2GtdajAeW8aj6ghfGUulLkpYSR4xXgdXOd3RyaoCHsv1ZGlQD4vql3fWxF\niPHHFsWcM7OKOKYYrfvxXS/6i9P28YfD7Rghmy++Qcj8ZBjbqYpb2c3UaGLkAQMC\n25Eu946VAgMBAAECggEAEhpsFV8lpikQdxi3ZmEMivZDLlu/FAflMNXypRJ+XeZA\nogQeN3xd75HhaNZo9WRik792JMsN9V+Du4EPJbx61ag08EQixpvreF+d7Sv38VLb\nSrlTTRdYHOIgkROCgs/QDEK14xYoet8DaxVzB6367g6zQb9OGY8hwiK9nC4G1lgi\nUyO3UBiZVgyrCBtmfbAYti0YTVeXSnA24Q2c8T8Jfe6ILPNJK8Dj3T1mYVDgZoYS\njlOhzZ+B2SZvRSTIp9npgNyipnPw9IP7PPvx+nz4XIgFqN4jIP7lWAysrA4SJ0nU\n2guj/hGWP0KAocU+8nUR0BrUUe1bOca/HPt7K8QwAQKBgQDhP2Lm41tegtwGp42U\nccgyfKdch2QrlIJ7qaobuzJtqnGFgb1t/hsC74FDo0Bm4ls96nQrZTEQxX68BHn/\n0C3c5QTXTp+yc+hxVyxXQKK6GV83G3p2KM2JSVYrMuMu3S/hQAaZcLcuznpX1Yqn\n5jYNKKcY1JkgfYjgOiWE6NpVsQKBgQDZNImX7Uq5+YMDBamdB4GODa8PIp3UaxNa\n9QMJZvswJn4gfdNj/TwdawcrW2dgfL6vYT1tEaVlyYL6gDVmNYjXSY6yxjhkMOd2\n7rmtZNjgO451I16upzdHe7ztU8B4rGVwQJTC6L43qiPRTjHS805dUQb6aU63jKfv\nKpVhv4rsJQKBgF89zRTxp42z6VMK/+t3nP30BVQzj2B6AB5H5Dyrj6wdOLkJ3c4n\ndsZr/Q1bdvzJ02i/vPUoaXG9AFSB1BAdt3bCg6SCgzYSmoNqJ76Q/v2PgtorTUGv\nCRF2p+/GKZeEQR2OU/wHU/1/ou2GxoUt60bvHJB8PG8nhXvCOmETkFZRAoGAZFQg\nOk0hd0YJfhvffOk6rqMjeZpDzRqolhsWjAFFhbhCCkAUpNsUKYKGjUBrP+ZfLiN8\nfCTqgVnTZmJSSCPyUX9oqqtk4OK2B/m9SpqKkwjvhKwR0BrtLde6LOXCwfrf4Dn0\nfROEybGNWeEEoqxARlpnHsQF2ELgT1kcJ0qSoQECgYEAl8UGXfJaGa4azBzXSzCz\nnzj5jARo8dHLBj/XFf8BuKeswQ4luYsOJXIELm0D8p8Z6QOPkImDMNPh3d6QTe9k\nO6Gm6FAjdUoc+j9IliKEBIRMCghyq2seqV3NiBQ7IwnikKvxKJ+hC7uMzghThdpK\nnm0XS5Fj7xh4kT6+ZXiM/VA=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-snstv@pratos-limpos-dev.iam.gserviceaccount.com',
  client_id: '113393100061371934214',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-snstv%40pratos-limpos-dev.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: 'https://pratos-limpos-dev.firebaseio.com',
});

module.exports = admin;
