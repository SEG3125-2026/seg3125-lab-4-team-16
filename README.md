# Lab 4 - Hair Salon Booking Website

## Overview
This is a single-page booking website for **Elite Cuts**, a premium hair salon and barbershop. The website is built using Bootstrap 5 and implements Don Norman's Design Principles: **Visibility**, **Affordance**, **Mapping**, and **Consistency**.

## Design Principles Implementation

### 1. Visibility
- **Clear Business Identity**: Logo, business name, and contact information prominently displayed in header
- **Service Information**: All services shown with prices, duration, and descriptions
- **Staff Profiles**: Expert stylists displayed with photos, roles, and specialties
- **Progress Indicator**: Visual stepper showing current step in booking process
- **Selected Items Summary**: Clear display of selected service, staff, date/time
- **Next Step Buttons**: Only shown when user is ready to proceed

### 2. Affordance
- **Clickable Elements**: Service and staff cards have hover effects and clear clickability
- **Button Styling**: All buttons use consistent styling with icons and labels
- **Form Inputs**: Clear visual indication that fields are editable
- **Icons + Labels**: All interactive elements use both icons and text labels
- **Tooltips**: Form fields include helpful descriptions

### 3. Mapping
- **Service Images**: Visual representation of each service type
- **Staff Photos**: Photos help users connect with stylists
- **Progress Steps**: Clear mapping between steps and user's position
- **Summary Updates**: Immediate visual feedback when selections are made

### 4. Consistency
- **Color Scheme**: Consistent use of primary purple theme throughout
- **Typography**: Elegant, readable font choices (serif for headings, sans-serif for body)
- **Component Styling**: All cards, buttons, and forms use consistent styling
- **Bootstrap Components**: Standard Bootstrap components for familiar interactions
- **Terminology**: Consistent naming throughout (e.g., "Stylist" vs "Barber")

## Features

### Booking Flow
1. **Choose Service**: Select from 6 services (Men's/Women's cuts, Beard trim, Color, Wash & Style, Package)
2. **Choose Stylist**: Select preferred stylist or "Any Stylist" option
3. **Select Date & Time**: Choose appointment date and available time slot
4. **Enter Contact Info**: Provide name, email, phone (optional), and special notes
5. **Confirmation**: View booking summary with reference number

### Services Offered
- Men's Haircut - $35 (30 min)
- Women's Haircut - $55 (45 min)
- Beard Trim - $25 (20 min)
- Hair Color - $85 (90 min)
- Wash & Style - $40 (30 min)
- Haircut + Beard Package - $50 (45 min)

### Staff Members
- **Sarah Johnson** - Senior Stylist (Women's Cuts & Color)
- **Michael Chen** - Master Barber (Men's Grooming)
- **Emma Rodriguez** - Color Specialist (Hair Coloring)
- **James Wilson** - Stylist (All Services)

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **Bootstrap 5.3.2**: CSS framework for responsive design
- **Bootstrap Icons**: Icon library
- **Vanilla JavaScript**: No frameworks, pure JS for interactions
- **CSS3**: Custom styling with CSS variables

### File Structure
```
lab4/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Custom styles and theme
├── js/
│   └── app.js         # Application logic
└── README.md          # This file
```

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Accessible (keyboard navigation, screen reader support)

## Design Choices

### Color Scheme
- **Primary**: Purple (#6c5ce7) - Elegant, professional, modern
- **Accent**: Pink (#fd79a8) - Warm, welcoming
- **Neutral**: Grays for text and backgrounds

### Typography
- **Headings**: Serif font (Georgia) for elegance
- **Body**: Sans-serif (Segoe UI) for readability

### Layout
- **Mobile-first**: Vertical scrolling design
- **No side navigation**: Single-page vertical flow
- **Card-based**: Information organized in cards
- **Progressive disclosure**: Show information as needed

## Accessibility Features

- All form inputs have proper labels
- Keyboard navigation support
- Visible focus states (not removed)
- Color contrast meets WCAG standards
- Alt text for images
- Semantic HTML structure

## Usage

1. Open `index.html` in a web browser
2. Follow the booking flow:
   - Select a service
   - Choose a stylist (optional)
   - Pick date and time
   - Enter contact information
   - Confirm booking
3. View confirmation with reference number

## Future Enhancements

- Form validation with Vanilla JS (Lab 5)
- Payment integration
- Calendar integration
- Email notifications
- Appointment management

## Notes

- This is a **semi-static site** - responds only to Bootstrap 5 components
- No backend integration - all data is client-side
- Images use Unsplash placeholder URLs
- Date picker constraints prevent past dates
- Time slots generated dynamically based on selected date

## Credits

- **Bootstrap 5**: https://getbootstrap.com/
- **Bootstrap Icons**: https://icons.getbootstrap.com/
- **Design Principles**: Don Norman's "Design of Everyday Things"
- **Images**: Unsplash (placeholder images)

---

**Lab 4 - SEG3125 Analysis and Design of User Interfaces**
**Team 16**
