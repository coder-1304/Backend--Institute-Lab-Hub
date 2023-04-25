
class Service {
    static user = 'shanneeahirwar20174@acropolis.in';
    static pass = 'passmicro@1234';
    
    static sendEmail(to, subject, body) {
      // Code to send email using the static email and password properties
      console.log(`Sending email from ${EmailService.email} to ${to}`);
    }
  }
  
export default Service;
  