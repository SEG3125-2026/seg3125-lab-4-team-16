// Lab 4 - Hair Salon Booking System
// This file handles the booking flow and implements design principles

// Store the current booking state
const bookingState = {
    selectedService: null,
    selectedStaff: null,
    selectedDate: null,
    selectedTime: null,
    customerInfo: {}
};

// Services data with descriptions and images
const services = [
    {
        id: 1,
        name: "Men's Haircut",
        price: 35,
        duration: "30 min",
        description: "Professional men's haircut with styling",
        tooltip: "Includes consultation, cut, wash, and styling. Perfect for all hair types and lengths.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
        category: "cut"
    },
    {
        id: 2,
        name: "Women's Haircut",
        price: 55,
        duration: "45 min",
        description: "Stylish women's haircut with consultation",
        tooltip: "Includes style consultation, precision cut, wash, and professional styling. Suitable for all hair lengths.",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        category: "cut"
    },
    {
        id: 3,
        name: "Beard Trim",
        price: 25,
        duration: "20 min",
        description: "Precise beard trimming and shaping",
        tooltip: "Professional beard trimming, shaping, and styling. Includes hot towel treatment.",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
        category: "trim"
    },
    {
        id: 4,
        name: "Hair Color",
        price: 85,
        duration: "90 min",
        description: "Full hair coloring service with consultation",
        tooltip: "Complete hair coloring service includes: color consultation, full color application, processing time, wash, and styling. Perfect for full coverage, highlights, or color correction.",
        image: "https://images.unsplash.com/photo-1560869713-7d563b1e4e46?w=400&h=300&fit=crop&auto=format",
        category: "color"
    },
    {
        id: 5,
        name: "Wash & Style",
        price: 40,
        duration: "30 min",
        description: "Hair wash with professional styling",
        tooltip: "Professional shampoo, conditioning treatment, blow-dry, and styling. Great for special occasions or regular maintenance.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
        category: "style"
    },
    {
        id: 6,
        name: "Haircut + Beard",
        price: 50,
        duration: "45 min",
        description: "Complete grooming package for men",
        tooltip: "Complete grooming package includes: men's haircut, beard trim, hot towel treatment, and styling. Best value for full grooming service.",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop",
        category: "package"
    }
];

// Staff member information
const staff = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Stylist",
        specialty: "Women's Cuts & Color",
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
        bio: "Specializes in modern cuts and vibrant color techniques"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Master Barber",
        specialty: "Men's Grooming",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        bio: "Expert in classic and contemporary men's styles"
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Color Specialist",
        specialty: "Hair Coloring",
        experience: "6 years",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
        bio: "Creative colorist with expertise in balayage and highlights"
    },
    {
        id: 4,
        name: "James Wilson",
        role: "Stylist",
        specialty: "All Services",
        experience: "5 years",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
        bio: "Versatile stylist ready to help with any service"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(function() {
        renderServices();
        renderStaff();
        setupEventListeners();
        initializeDatePicker();
    }, 100);
});

// Set up tooltips to help users understand services
function initializeTooltips() {
    try {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        }
    } catch (error) {
        console.log('Tooltips not available:', error);
    }
}

// Display all available services
function renderServices() {
    const container = document.getElementById('services-container');
    if (!container) {
        console.error('Services container not found!');
        return;
    }
    container.innerHTML = '';

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'col-md-6 col-lg-4';
        serviceCard.innerHTML = `
            <div class="card service-card h-100 shadow-sm" data-service-id="${service.id}">
                <img src="${service.image}" class="card-img-top" alt="${service.name}" style="height: 200px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/400x300/6c5ce7/ffffff?text=${encodeURIComponent(service.name)}';">
                <div class="card-body">
                    <h5 class="card-title">
                        ${service.name}
                        <i class="bi bi-info-circle text-primary ms-2" 
                           data-bs-toggle="tooltip" 
                           data-bs-placement="top" 
                           data-bs-title="${service.tooltip}"
                           style="cursor: help;"></i>
                    </h5>
                    <p class="card-text text-muted">${service.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span class="badge bg-primary">$${service.price}</span>
                            <span class="badge bg-secondary ms-2">
                                <i class="bi bi-clock me-1"></i>${service.duration}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="btn btn-outline-primary w-100 select-service-btn" data-service-id="${service.id}">
                        <i class="bi bi-check-circle me-2"></i>Select Service
                    </button>
                </div>
            </div>
        `;
        container.appendChild(serviceCard);
    });

    // Use event delegation for more reliable click handling
    container.addEventListener('click', function(e) {
        // Handle button clicks
        const button = e.target.closest('.select-service-btn');
        if (button) {
            e.stopPropagation();
            e.preventDefault();
            const serviceId = parseInt(button.getAttribute('data-service-id'));
            if (serviceId) {
                selectService(serviceId);
            }
            return;
        }
        
        // Handle card clicks (but not on buttons or tooltips)
        const card = e.target.closest('.service-card');
        if (card && !e.target.closest('.select-service-btn') && !e.target.closest('[data-bs-toggle="tooltip"]')) {
            const serviceId = parseInt(card.getAttribute('data-service-id'));
            if (serviceId) {
                selectService(serviceId);
            }
        }
    });

    // Set cursor for all cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.cursor = 'pointer';
    });

    // Initialize tooltips after rendering
    initializeTooltips();
}

// Handle service selection
function selectService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    bookingState.selectedService = service;

    // Clear previous selections
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Highlight the selected service
    const selectedCard = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    // Show what was selected
    showServiceSummary(service);

    // Enable the next button
    const nextBtn = document.getElementById('next-to-staff');
    nextBtn.classList.remove('d-none');
    nextBtn.disabled = false;

    // Update progress
    updateProgress('step-service', true);
}

// Display the selected service summary
function showServiceSummary(service) {
    document.getElementById('selected-service-name').textContent = service.name;
    document.getElementById('selected-service-price').textContent = `$${service.price}`;
    document.getElementById('selected-service-duration').textContent = service.duration;
    document.getElementById('service-summary').classList.remove('d-none');
}

// Display all staff members
function renderStaff() {
    const container = document.getElementById('staff-container');
    container.innerHTML = '';

    // Add "Any Stylist" option
    const anyStylistCard = document.createElement('div');
    anyStylistCard.className = 'col-md-6 col-lg-3';
    anyStylistCard.innerHTML = `
        <div class="card staff-card h-100 shadow-sm" data-staff-id="0">
            <div class="card-body text-center">
                <div class="staff-avatar mb-3" style="width: 120px; height: 120px; margin: 0 auto; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
                    <i class="bi bi-people-fill text-white" style="font-size: 3rem;"></i>
                </div>
                <h5 class="card-title">Any Stylist</h5>
                <p class="card-text text-muted">We'll assign the best available stylist</p>
            </div>
        </div>
    `;
    container.appendChild(anyStylistCard);

    staff.forEach(member => {
        const staffCard = document.createElement('div');
        staffCard.className = 'col-md-6 col-lg-3';
        staffCard.innerHTML = `
            <div class="card staff-card h-100 shadow-sm" data-staff-id="${member.id}">
                <img src="${member.image}" class="card-img-top" alt="${member.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body text-center">
                    <h5 class="card-title">${member.name}</h5>
                    <p class="card-text">
                        <span class="badge bg-primary">${member.role}</span>
                    </p>
                    <p class="card-text text-muted small">${member.specialty}</p>
                    <p class="card-text text-muted small">${member.experience} experience</p>
                    <button class="btn btn-sm btn-outline-primary mt-2 select-staff-btn" data-staff-id="${member.id}">
                        <i class="bi bi-check-circle me-1"></i>Select
                    </button>
                </div>
            </div>
        `;
        container.appendChild(staffCard);
    });

    // Add click handlers
    document.querySelectorAll('.select-staff-btn, .staff-card').forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target.closest('.select-staff-btn')) {
                const staffId = parseInt(e.target.closest('.select-staff-btn').dataset.staffId);
                selectStaff(staffId);
            } else if (this.classList.contains('staff-card')) {
                const staffId = parseInt(this.dataset.staffId);
                selectStaff(staffId);
            }
        });
    });

    // Add hover effect
    document.querySelectorAll('.staff-card').forEach(card => {
        card.style.cursor = 'pointer';
    });
}

// Select Staff
function selectStaff(staffId) {
    let selectedStaffData = null;
    
    if (staffId === 0) {
        selectedStaffData = { id: 0, name: "Any Stylist", specialty: "Best Available" };
    } else {
        selectedStaffData = staff.find(s => s.id === staffId);
    }

    if (!selectedStaffData) return;

    bookingState.selectedStaff = selectedStaffData;

    // Remove previous selections
    document.querySelectorAll('.staff-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Highlight selected
    const selectedCard = document.querySelector(`[data-staff-id="${staffId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    // Show summary
    showStaffSummary(selectedStaffData);

    // Enable next button
    document.getElementById('next-to-datetime').disabled = false;
    updateProgress('step-staff', true);
}

// Show Staff Summary
function showStaffSummary(staffData) {
    document.getElementById('selected-staff-name').textContent = staffData.name;
    document.getElementById('selected-staff-specialty').textContent = staffData.specialty;
    document.getElementById('staff-summary').classList.remove('d-none');
}

// Set up date picker with constraints
function initializeDatePicker() {
    const dateInput = document.getElementById('appointment-date');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];

    dateInput.addEventListener('change', function() {
        bookingState.selectedDate = this.value;
        populateTimeSlots();
        checkDateTimeComplete();
    });
}

// Generate available time slots
function populateTimeSlots() {
    const timeSelect = document.getElementById('appointment-time');
    const selectedDate = bookingState.selectedDate;
    
    if (!selectedDate) return;

    timeSelect.innerHTML = '<option value="">Choose a time...</option>';

    // Create time slots from 9 AM to 7 PM, every 30 minutes
    const slots = [];
    for (let hour = 9; hour < 19; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const displayTime = formatTime(hour, minute);
            slots.push({ value: timeString, display: displayTime });
        }
    }

    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.value;
        option.textContent = slot.display;
        timeSelect.appendChild(option);
    });

    timeSelect.addEventListener('change', function() {
        bookingState.selectedTime = this.value;
        checkDateTimeComplete();
    });
}

// Format time for display
function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Check if Date/Time is Complete
function checkDateTimeComplete() {
    if (bookingState.selectedDate && bookingState.selectedTime) {
        showDateTimeSummary();
        document.getElementById('next-to-contact').disabled = false;
        updateProgress('step-datetime', true);
    }
}

// Show Date/Time Summary
function showDateTimeSummary() {
    const date = new Date(bookingState.selectedDate);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = formatTimeFromString(bookingState.selectedTime);
    
    document.getElementById('selected-datetime').textContent = `${dateStr} at ${timeStr}`;
    document.getElementById('datetime-summary').classList.remove('d-none');
}

// Format Time from String
function formatTimeFromString(timeString) {
    const [hour, minute] = timeString.split(':').map(Number);
    return formatTime(hour, minute);
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('next-to-staff').addEventListener('click', () => showSection('staff-section'));
    document.getElementById('back-to-service').addEventListener('click', () => showSection('services-section'));
    document.getElementById('next-to-datetime').addEventListener('click', () => showSection('datetime-section'));
    document.getElementById('back-to-staff').addEventListener('click', () => showSection('staff-section'));
    document.getElementById('next-to-contact').addEventListener('click', () => showSection('contact-section'));
    document.getElementById('back-to-datetime').addEventListener('click', () => showSection('datetime-section'));
    document.getElementById('submit-booking').addEventListener('click', submitBooking);
    document.getElementById('new-booking').addEventListener('click', resetBooking);

    // Contact form validation - Constraints: Require key fields
    const contactForm = document.getElementById('contact-form');
    const inputs = contactForm.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('input', validateContactForm);
    });
}

// Validate the contact form
function validateContactForm() {
    const nameInput = document.getElementById('customer-name');
    const emailInput = document.getElementById('customer-email');
    const phoneInput = document.getElementById('customer-phone');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[\d\s\-\(\)]+$/;

    let isValid = true;
    const errors = [];

    // Reset error states
    clearValidationErrors();

    // Validate name
    if (name.length === 0) {
        showFieldError('customer-name', 'name-error', 'Please enter your full name');
        errors.push('Full name is required');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('customer-name', 'name-error', 'Name must be at least 2 characters');
        errors.push('Name is too short');
        isValid = false;
    } else {
        showFieldSuccess('customer-name');
    }

    // Validate email
    if (email.length === 0) {
        showFieldError('customer-email', 'email-error', 'Please enter your email address');
        errors.push('Email address is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showFieldError('customer-email', 'email-error', 'Please enter a valid email address');
        errors.push('Email address is invalid');
        isValid = false;
    } else {
        showFieldSuccess('customer-email');
    }

    // Validate phone (optional but if provided, must be valid)
    if (phone.length > 0 && !phonePattern.test(phone)) {
        showFieldError('customer-phone', 'phone-error', 'Please enter a valid phone number');
        errors.push('Phone number format is invalid');
        isValid = false;
    } else if (phone.length > 0) {
        showFieldSuccess('customer-phone');
    }

    // Show error alert if there are errors
    if (!isValid) {
        showErrorAlert(errors);
    } else {
        hideErrorAlert();
    }

    document.getElementById('submit-booking').disabled = !isValid;

    // Visual feedback
    if (isValid) {
        updateProgress('step-contact', true);
    }
}

// Show error message for a form field
function showFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(errorId);
    
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    errorDiv.textContent = message;
    errorDiv.classList.remove('d-none');
}

// Show field success
function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// Clear all validation errors
function clearValidationErrors() {
    document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.classList.add('d-none');
    });
}

// Display error alert at top of form
function showErrorAlert(errors) {
    const alertDiv = document.getElementById('form-error-alert');
    const errorList = document.getElementById('error-list');
    
    errorList.innerHTML = '';
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });
    
    alertDiv.classList.remove('d-none');
}

// Hide error alert
function hideErrorAlert() {
    document.getElementById('form-error-alert').classList.add('d-none');
}

// Show a specific section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.booking-section').forEach(section => {
        section.classList.add('d-none');
    });

    // Show target section
    document.getElementById(sectionId).classList.remove('d-none');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Progress Indicator
function updateProgress(stepId, completed) {
    const step = document.getElementById(stepId);
    if (completed) {
        step.classList.add('active');
        step.querySelector('.step-circle').classList.add('completed');
    }
}

// Handle booking submission
function submitBooking() {
    // Check form validity first
    validateContactForm();
    
    const submitBtn = document.getElementById('submit-booking');
    if (submitBtn.disabled) {
        return;
    }

    // Show loading spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';

    // Get customer information
    bookingState.customerInfo = {
        name: document.getElementById('customer-name').value.trim(),
        email: document.getElementById('customer-email').value.trim(),
        phone: document.getElementById('customer-phone').value.trim(),
        notes: document.getElementById('special-notes').value.trim()
    };

    // Simulate processing (would be API call in real app)
    setTimeout(() => {
        // Create reference number
        const refNumber = 'EC-' + Date.now().toString().slice(-8);

        // Show confirmation page
        showConfirmation(refNumber);
        showSection('confirmation-section');
        updateProgress('step-confirm', true);
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Confirm Booking';
    }, 1000);
}

// Show Confirmation
function showConfirmation(refNumber) {
    const details = document.getElementById('confirmation-details');
    const date = new Date(bookingState.selectedDate);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = formatTimeFromString(bookingState.selectedTime);

    details.innerHTML = `
        <div class="row g-3">
            <div class="col-12">
                <p><strong><i class="bi bi-person me-2"></i>Name:</strong> ${bookingState.customerInfo.name}</p>
            </div>
            <div class="col-12">
                <p><strong><i class="bi bi-envelope me-2"></i>Email:</strong> ${bookingState.customerInfo.email}</p>
            </div>
            ${bookingState.customerInfo.phone ? `<div class="col-12"><p><strong><i class="bi bi-telephone me-2"></i>Phone:</strong> ${bookingState.customerInfo.phone}</p></div>` : ''}
            <div class="col-12">
                <p><strong><i class="bi bi-scissors me-2"></i>Service:</strong> ${bookingState.selectedService.name} - $${bookingState.selectedService.price}</p>
            </div>
            <div class="col-12">
                <p><strong><i class="bi bi-person-check me-2"></i>Stylist:</strong> ${bookingState.selectedStaff.name}</p>
            </div>
            <div class="col-12">
                <p><strong><i class="bi bi-calendar-event me-2"></i>Date & Time:</strong> ${dateStr} at ${timeStr}</p>
            </div>
            ${bookingState.customerInfo.notes ? `<div class="col-12"><p><strong><i class="bi bi-chat-left-text me-2"></i>Notes:</strong> ${bookingState.customerInfo.notes}</p></div>` : ''}
        </div>
    `;

    document.getElementById('reference-number').textContent = refNumber;
}

// Reset Booking
function resetBooking() {
    // Reset state
    bookingState.selectedService = null;
    bookingState.selectedStaff = null;
    bookingState.selectedDate = null;
    bookingState.selectedTime = null;
    bookingState.customerInfo = {};

    // Reset UI
    document.querySelectorAll('.service-card, .staff-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.getElementById('service-summary').classList.add('d-none');
    document.getElementById('staff-summary').classList.add('d-none');
    document.getElementById('datetime-summary').classList.add('d-none');

    document.getElementById('contact-form').reset();
    document.getElementById('appointment-date').value = '';
    document.getElementById('appointment-time').innerHTML = '<option value="">Choose a time...</option>';

    // Reset progress
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
        step.querySelector('.step-circle').classList.remove('completed');
    });

    // Show first section
    showSection('services-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
