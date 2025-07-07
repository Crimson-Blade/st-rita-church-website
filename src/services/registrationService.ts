import type { EventRegistration, RegistrationFormData } from '../types';

// Local storage-based registration service for fallback when Strapi is not available
export interface LocalRegistration extends Omit<EventRegistration, 'event'> {
  eventId: number;
}

class RegistrationService {
  private storageKey = 'st-rita-registrations';

  getRegistrations(): LocalRegistration[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading registrations from localStorage:', error);
      return [];
    }
  }

  saveRegistrations(registrations: LocalRegistration[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(registrations));
    } catch (error) {
      console.error('Error saving registrations to localStorage:', error);
    }
  }

  async registerForEvent(eventId: number, data: RegistrationFormData): Promise<LocalRegistration> {
    const registrations = this.getRegistrations();
    
    const newRegistration: LocalRegistration = {
      id: Date.now(), // Simple ID generation
      eventId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      attendeeCount: data.attendeeCount,
      additionalInfo: data.additionalInfo || '',
      registrationDate: new Date().toISOString(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    registrations.push(newRegistration);
    this.saveRegistrations(registrations);

    // Send confirmation email (using EmailJS or similar)
    await this.sendConfirmationEmail(newRegistration);

    return newRegistration;
  }

  getEventRegistrations(eventId: number): LocalRegistration[] {
    return this.getRegistrations().filter(reg => 
      reg.eventId === eventId && reg.status === 'confirmed'
    );
  }

  getEventAttendeeCount(eventId: number): number {
    return this.getEventRegistrations(eventId)
      .reduce((total, reg) => total + reg.attendeeCount, 0);
  }

  getRegistration(registrationId: number): LocalRegistration | null {
    return this.getRegistrations().find(reg => reg.id === registrationId) || null;
  }

  async cancelRegistration(registrationId: number): Promise<boolean> {
    try {
      const registrations = this.getRegistrations();
      const index = registrations.findIndex(reg => reg.id === registrationId);
      
      if (index === -1) {
        return false;
      }

      registrations[index].status = 'cancelled';
      registrations[index].updatedAt = new Date().toISOString();
      
      this.saveRegistrations(registrations);
      
      // Send cancellation email
      await this.sendCancellationEmail(registrations[index]);
      
      return true;
    } catch (error) {
      console.error('Error cancelling registration:', error);
      return false;
    }
  }

  private async sendConfirmationEmail(registration: LocalRegistration): Promise<void> {
    try {
      // Placeholder for email service integration
      // You would integrate with EmailJS, SendGrid, or similar service here
      console.log('Sending confirmation email for registration:', registration.id);
      
      // Example EmailJS integration:
      /*
      const emailjs = await import('@emailjs/browser');
      
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: registration.email,
          to_name: registration.name,
          event_id: registration.eventId,
          attendee_count: registration.attendeeCount,
          registration_id: registration.id,
          registration_date: new Date(registration.registrationDate).toLocaleDateString()
        },
        'YOUR_PUBLIC_KEY'
      );
      */
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  }

  private async sendCancellationEmail(registration: LocalRegistration): Promise<void> {
    try {
      // Placeholder for email service integration
      console.log('Sending cancellation email for registration:', registration.id);
    } catch (error) {
      console.error('Failed to send cancellation email:', error);
    }
  }

  // Admin functions
  getAllRegistrations(): LocalRegistration[] {
    return this.getRegistrations();
  }

  exportRegistrations(): string {
    return JSON.stringify(this.getRegistrations(), null, 2);
  }

  importRegistrations(jsonData: string): boolean {
    try {
      const registrations = JSON.parse(jsonData) as LocalRegistration[];
      this.saveRegistrations(registrations);
      return true;
    } catch (error) {
      console.error('Error importing registrations:', error);
      return false;
    }
  }

  clearAllRegistrations(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const registrationService = new RegistrationService();
