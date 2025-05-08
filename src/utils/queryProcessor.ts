import {
  Course,
  Department,
  Facilities,
  Admission,
  Events,
  Clubs,
  Placements,
  Contact,
} from '../types';

class QueryProcessor {
  private courses: Course | null = null;
  private departments: Department | null = null;
  private facilities: Facilities | null = null;
  private admission: Admission | null = null;
  private events: Events | null = null;
  private clubs: Clubs | null = null;
  private placements: Placements | null = null;
  private contact: Contact | null = null;

  private courseKeywords = [
    'course', 'courses', 'program', 'programs', 'degree', 'degrees', 'btech', 'mtech', 'mba', 'study'
  ];
  
  private departmentKeywords = [
    'department', 'departments', 'faculty', 'stream', 'discipline', 'branch'
  ];
  
  private facilitiesKeywords = [
    'facility', 'facilities', 'amenities', 'infrastructure', 'library', 'hostel', 'canteen', 'cafeteria', 'lab', 'laboratory', 'sports', 'gym', 'wi-fi', 'wifi'
  ];
  
  private admissionKeywords = [
    'admission', 'admissions', 'apply', 'entrance', 'eligibility', 'criteria', 'requirements', 'application', 'exam', 'test', 'procedure', 'process'
  ];
  
  private eventsKeywords = [
    'event', 'events', 'fest', 'festival', 'conference', 'seminar', 'workshop', 'competition', 'cultural', 'technical'
  ];
  
  private clubsKeywords = [
    'club', 'clubs', 'society', 'societies', 'association', 'committee', 'extracurricular', 'activity', 'activities'
  ];
  
  private placementsKeywords = [
    'placement', 'placements', 'job', 'jobs', 'career', 'careers', 'recruitment', 'salary', 'package', 'company', 'companies', 'offer', 'offers'
  ];
  
  private contactKeywords = [
    'contact', 'contacts', 'address', 'phone', 'email', 'website', 'location', 'social', 'media', 'reach'
  ];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const coursesModule = await import('../data/courses.json');
      this.courses = coursesModule.default;
      
      const departmentsModule = await import('../data/departments.json');
      this.departments = departmentsModule.default;
      
      const facilitiesModule = await import('../data/facilities.json');
      this.facilities = facilitiesModule.default;
      
      const admissionModule = await import('../data/admission.json');
      this.admission = admissionModule.default;
      
      const eventsModule = await import('../data/events.json');
      this.events = eventsModule.default;
      
      const clubsModule = await import('../data/clubs.json');
      this.clubs = clubsModule.default;
      
      const placementsModule = await import('../data/placements.json');
      this.placements = placementsModule.default;
      
      const contactModule = await import('../data/contact.json');
      this.contact = contactModule.default;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private matchKeywords(query: string, keywords: string[]): boolean {
    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()));
  }

  public async processQuery(query: string): Promise<string> {
    if (!this.courses) {
      await this.loadData();
    }

    const lowerQuery = query.toLowerCase();

    if (this.isGreeting(lowerQuery)) {
      return "Hello! I'm the SRM Ramapuram College bot. How can I help you today? You can ask me about courses, departments, facilities, admission, events, clubs, placements, or contact information.";
    }

    if (this.isThankYou(lowerQuery)) {
      return "You're welcome! If you have any more questions about SRM Ramapuram, feel free to ask.";
    }

    if (this.matchKeywords(query, this.courseKeywords)) {
      return this.getCoursesInfo();
    }

    if (this.matchKeywords(query, this.departmentKeywords)) {
      return this.getDepartmentsInfo();
    }

    if (this.matchKeywords(query, this.facilitiesKeywords)) {
      return this.getFacilitiesInfo();
    }

    if (this.matchKeywords(query, this.admissionKeywords)) {
      return this.getAdmissionInfo();
    }

    if (this.matchKeywords(query, this.eventsKeywords)) {
      return this.getEventsInfo();
    }

    if (this.matchKeywords(query, this.clubsKeywords)) {
      return this.getClubsInfo();
    }

    if (this.matchKeywords(query, this.placementsKeywords)) {
      return this.getPlacementsInfo();
    }

    if (this.matchKeywords(query, this.contactKeywords)) {
      return this.getContactInfo();
    }

    return "I'm not sure I understand your question. You can ask me about courses, departments, facilities, admission, events, clubs, placements, or contact information of SRM Ramapuram College.";
  }

  private isGreeting(query: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    return greetings.some(greeting => query.includes(greeting));
  }

  private isThankYou(query: string): boolean {
    const thankYous = ['thank you', 'thanks', 'thx', 'thank'];
    return thankYous.some(thankYou => query.includes(thankYou));
  }

  private getCoursesInfo(): string {
    if (!this.courses || !this.courses.courses) {
      return "Sorry, course information is not available at the moment.";
    }

    let response = "**Courses offered at SRM Ramapuram:**\n\n";

    if (this.courses.courses.undergraduate) {
      response += "**Undergraduate Programs:**\n";
      response += this.courses.courses.undergraduate.map(course => `- ${course}`).join("\n");
      response += "\n\n";
    }

    if (this.courses.courses.postgraduate) {
      response += "**Postgraduate Programs:**\n";
      response += this.courses.courses.postgraduate.map(course => `- ${course}`).join("\n");
      response += "\n\n";
    }

    if (this.courses.courses.doctoral) {
      response += "**Doctoral Programs:**\n";
      response += this.courses.courses.doctoral.map(course => `- ${course}`).join("\n");
      response += "\n\n";
    }

    if (this.courses.info) {
      response += this.courses.info;
    }

    return response;
  }

  private getDepartmentsInfo(): string {
    if (!this.departments || !this.departments.departments) {
      return "Sorry, department information is not available at the moment.";
    }

    let response = "**Departments at SRM Ramapuram:**\n\n";

    if (this.departments.departments.engineering) {
      response += "**Engineering Departments:**\n";
      response += this.departments.departments.engineering.map(dept => `- ${dept}`).join("\n");
      response += "\n\n";
    }

    if (this.departments.departments.management) {
      response += "**Management Departments:**\n";
      response += this.departments.departments.management.map(dept => `- ${dept}`).join("\n");
      response += "\n\n";
    }

    if (this.departments.departments.science) {
      response += "**Science Departments:**\n";
      response += this.departments.departments.science.map(dept => `- ${dept}`).join("\n");
      response += "\n\n";
    }

    if (this.departments.departments.humanities) {
      response += "**Humanities Departments:**\n";
      response += this.departments.departments.humanities.map(dept => `- ${dept}`).join("\n");
      response += "\n\n";
    }

    if (this.departments.info) {
      response += this.departments.info;
    }

    return response;
  }

  private getFacilitiesInfo(): string {
    if (!this.facilities || !this.facilities.facilities) {
      return "Sorry, facilities information is not available at the moment.";
    }

    let response = "**Facilities at SRM Ramapuram:**\n\n";

    const categories = Object.keys(this.facilities.facilities) as Array<keyof typeof this.facilities.facilities>;
    
    categories.forEach(category => {
      const facilities = this.facilities.facilities[category];
      if (facilities && facilities.length > 0) {
        response += `**${category.charAt(0).toUpperCase() + category.slice(1)} Facilities:**\n`;
        facilities.forEach(facility => {
          response += `- **${facility.name}**: ${facility.description}\n`;
        });
        response += "\n";
      }
    });

    if (this.facilities.info) {
      response += this.facilities.info;
    }

    return response;
  }

  private getAdmissionInfo(): string {
    if (!this.admission || !this.admission.admission) {
      return "Sorry, admission information is not available at the moment.";
    }

    let response = "**Admission Information for SRM Ramapuram:**\n\n";

    const admission = this.admission.admission;

    if (admission.undergraduate) {
      response += "**Undergraduate Admissions:**\n";
      response += `- Eligibility: ${admission.undergraduate.eligibility}\n`;
      response += `- Entrance Exam: ${admission.undergraduate.entrance_exam}\n`;
      response += `- Application Fee: ${admission.undergraduate.application_fee}\n`;
      response += `- Application Mode: ${admission.undergraduate.application_mode}\n\n`;
    }

    if (admission.postgraduate) {
      response += "**Postgraduate Admissions:**\n";
      response += `- Eligibility: ${admission.postgraduate.eligibility}\n`;
      response += `- Entrance Exam: ${admission.postgraduate.entrance_exam}\n`;
      response += `- Application Fee: ${admission.postgraduate.application_fee}\n`;
      response += `- Application Mode: ${admission.postgraduate.application_mode}\n\n`;
    }

    if (admission.doctoral) {
      response += "**Doctoral Admissions:**\n";
      response += `- Eligibility: ${admission.doctoral.eligibility}\n`;
      response += `- Entrance Exam: ${admission.doctoral.entrance_exam}\n`;
      response += `- Application Fee: ${admission.doctoral.application_fee}\n`;
      response += `- Application Mode: ${admission.doctoral.application_mode}\n\n`;
    }

    if (admission.documents) {
      response += "**Required Documents:**\n";
      admission.documents.forEach(doc => {
        response += `- ${doc}\n`;
      });
      response += "\n";
    }

    if (this.admission.info) {
      response += this.admission.info;
    }

    return response;
  }

  private getEventsInfo(): string {
    if (!this.events || !this.events.events) {
      return "Sorry, events information is not available at the moment.";
    }

    let response = "**Events at SRM Ramapuram:**\n\n";

    if (this.events.events.annual_fests) {
      response += "**Annual Festivals:**\n";
      this.events.events.annual_fests.forEach(fest => {
        response += `- **${fest.name}** (${fest.type}): ${fest.description}\n`;
      });
      response += "\n";
    }

    if (this.events.events.workshops) {
      response += "**Workshops:**\n";
      this.events.events.workshops.forEach(workshop => {
        response += `- **${workshop.name}**: ${workshop.description}\n`;
      });
      response += "\n";
    }

    if (this.events.events.guest_lectures) {
      response += "**Guest Lectures:**\n";
      this.events.events.guest_lectures.forEach(lecture => {
        response += `- **${lecture.name}**: ${lecture.description}\n`;
      });
      response += "\n";
    }

    if (this.events.events.competitions) {
      response += "**Competitions:**\n";
      this.events.events.competitions.forEach(competition => {
        response += `- **${competition.name}**: ${competition.description}\n`;
      });
      response += "\n";
    }

    if (this.events.info) {
      response += this.events.info;
    }

    return response;
  }

  private getClubsInfo(): string {
    if (!this.clubs || !this.clubs.clubs) {
      return "Sorry, clubs information is not available at the moment.";
    }

    let response = "**Student Clubs at SRM Ramapuram:**\n\n";

    if (this.clubs.clubs.technical) {
      response += "**Technical Clubs:**\n";
      this.clubs.clubs.technical.forEach(club => {
        response += `- **${club.name}**: ${club.description}\n`;
      });
      response += "\n";
    }

    if (this.clubs.clubs.cultural) {
      response += "**Cultural Clubs:**\n";
      this.clubs.clubs.cultural.forEach(club => {
        response += `- **${club.name}**: ${club.description}\n`;
      });
      response += "\n";
    }

    if (this.clubs.clubs.literary) {
      response += "**Literary Clubs:**\n";
      this.clubs.clubs.literary.forEach(club => {
        response += `- **${club.name}**: ${club.description}\n`;
      });
      response += "\n";
    }

    if (this.clubs.clubs.sports) {
      response += "**Sports Clubs:**\n";
      this.clubs.clubs.sports.forEach(club => {
        response += `- **${club.name}**: ${club.description}\n`;
      });
      response += "\n";
    }

    if (this.clubs.clubs.entrepreneurship) {
      response += "**Entrepreneurship Clubs:**\n";
      this.clubs.clubs.entrepreneurship.forEach(club => {
        response += `- **${club.name}**: ${club.description}\n`;
      });
      response += "\n";
    }

    if (this.clubs.info) {
      response += this.clubs.info;
    }

    return response;
  }

  private getPlacementsInfo(): string {
    if (!this.placements || !this.placements.placements) {
      return "Sorry, placements information is not available at the moment.";
    }

    let response = "**Placements at SRM Ramapuram:**\n\n";

    const placements = this.placements.placements;

    if (placements.statistics) {
      response += "**Placement Statistics:**\n";
      response += `- Total Offers: ${placements.statistics.total_offers}\n`;
      response += `- Companies Visited: ${placements.statistics.companies_visited}\n`;
      response += `- Average Salary: ${placements.statistics.average_salary}\n`;
      response += `- Highest Salary: ${placements.statistics.highest_salary}\n\n`;
    }

    if (placements.top_recruiters) {
      response += "**Top Recruiting Companies:**\n";
      placements.top_recruiters.forEach(company => {
        response += `- ${company}\n`;
      });
      response += "\n";
    }

    if (placements.sectors) {
      response += "**Recruitment Sectors:**\n";
      placements.sectors.forEach(sector => {
        response += `- ${sector}\n`;
      });
      response += "\n";
    }

    if (this.placements.info) {
      response += this.placements.info;
    }

    return response;
  }

  private getContactInfo(): string {
    if (!this.contact || !this.contact.contact) {
      return "Sorry, contact information is not available at the moment.";
    }

    let response = "**Contact Information for SRM Ramapuram:**\n\n";

    const contact = this.contact.contact;

    if (contact.address) {
      response += `**Address:**\n${contact.address}\n\n`;
    }

    if (contact.phone && Array.isArray(contact.phone)) {
      response += "**Phone Numbers:**\n";
      contact.phone.forEach(phone => {
        response += `- ${phone}\n`;
      });
      response += "\n";
    }

    if (contact.email) {
      response += `**Email:** ${contact.email}\n`;
    }

    if (contact.website) {
      response += `**Website:** ${contact.website}\n\n`;
    }

    if (contact.placement_contact) {
      response += "**Placement Contact:**\n";
      response += `- Name: ${contact.placement_contact.name}\n`;
      response += `- Designation: ${contact.placement_contact.designation}\n`;
      response += `- Mobile: ${contact.placement_contact.mobile}\n`;
      response += `- Email: ${contact.placement_contact.email}\n\n`;
    }

    if (this.contact.info) {
      response += this.contact.info;
    }

    return response;
  }
}

export default new QueryProcessor();