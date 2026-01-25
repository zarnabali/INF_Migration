'use client';

import { useState, forwardRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField, TextFieldProps } from '@mui/material';

// Custom TextField wrapper to filter out internal props that shouldn't be passed to the DOM
// Also explicitly removes the endAdornment (icon)
const CustomTextField = forwardRef<HTMLDivElement, TextFieldProps & { sectionListRef?: any; areAllSectionsEmpty?: any }>((props, ref) => {
    const { sectionListRef, areAllSectionsEmpty, InputProps, ...other } = props;

    // Create a new InputProps object without the endAdornment (icon)
    const modifiedInputProps = {
        ...InputProps,
        endAdornment: null,
        readOnly: true // Prevent typing, as we want click-to-open
    };

    return <TextField {...other} InputProps={modifiedInputProps} ref={ref} />;
});

export const PricingTopBanner = () => {
    const [formData, setFormData] = useState({
        departureDate: null as Date | null,
        travelers: '1',
        tripCost: '',
        departureCity: '',
        destinationCity: ''
    });

    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData(prev => ({ ...prev, departureDate: date }));
        setDatePickerOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    const canSubmit =
        formData.departureDate !== null &&
        formData.travelers !== '' &&
        parseInt(formData.travelers) > 0 &&
        formData.tripCost.trim() !== '' &&
        formData.departureCity.trim() !== '' &&
        formData.destinationCity.trim() !== '';

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="overflow-hidden pb-8 pt-8">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <div className="banner-wrapper rounded-lg relative flex flex-col items-center justify-center text-white min-h-[550px] p-8 md:p-16">
                        <div className="relative z-10 w-full">
                            <div className="text-left mb-8">
                                <h1 className="text-[40px] md:text-[50px] lg:text-[64px] leading-[1.2] font-medium text-white mb-6">
                                    Get Your Travel Insurance Quote
                                </h1>
                            </div>

                            <div className="quote-form-card p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                                        {/* Departure Date - Col Span 2 */}
                                        <div className="col-span-1 md:col-span-1 lg:col-span-2">
                                            <label className="block mb-2 font-medium text-white text-[16px]">
                                                When are you going? *
                                            </label>
                                            <DesktopDatePicker
                                                enableAccessibleFieldDOMStructure={false}
                                                open={datePickerOpen}
                                                onOpen={() => setDatePickerOpen(true)}
                                                onClose={() => setDatePickerOpen(false)}
                                                value={formData.departureDate}
                                                onChange={handleDateChange}
                                                slots={{ textField: CustomTextField }}
                                                slotProps={{
                                                    textField: {
                                                        onClick: () => setDatePickerOpen(true),
                                                        placeholder: "Select departure date",
                                                        fullWidth: true,
                                                        variant: "outlined",
                                                        sx: {
                                                            '& .MuiOutlinedInput-root': {
                                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                                borderRadius: '10px',
                                                                height: '56px',
                                                                '& fieldset': { border: 'none' },
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                                },
                                                                '&.Mui-focused': {
                                                                    backgroundColor: '#ffffff',
                                                                    boxShadow: '0 0 0 2px #ff4081',
                                                                }
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '16.5px 14px',
                                                                fontSize: '1rem',
                                                                cursor: 'pointer'
                                                            }
                                                        }
                                                    },
                                                    popper: {
                                                        placement: 'bottom-start',
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, 8],
                                                                },
                                                            },
                                                        ],
                                                        sx: {
                                                            '& .MuiPaper-root': {
                                                                borderRadius: '12px',
                                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                                border: '1px solid rgba(0,0,0,0.05)',
                                                                marginTop: '4px'
                                                            },
                                                            '& .MuiDateCalendar-root': {
                                                                width: '320px',
                                                                borderRadius: '12px',
                                                            },
                                                            '& .MuiPickersDay-root.Mui-selected': {
                                                                backgroundColor: 'transparent',
                                                                color: '#000',
                                                                border: '1px solid #000',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                                                }
                                                            },
                                                            '& .MuiPickersDay-root.Mui-selected:focus': {
                                                                backgroundColor: 'transparent',
                                                            },
                                                            '& .MuiDayCalendar-weekDayLabel': {
                                                                fontWeight: 600,
                                                                color: '#333'
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Travelers - Col Span 2 */}
                                        <div className="col-span-1 md:col-span-1 lg:col-span-2">
                                            <label className="block mb-2 font-medium text-white text-[16px]">
                                                Number of Travelers *
                                            </label>
                                            <input
                                                type="number"
                                                name="travelers"
                                                min="1"
                                                max="6"
                                                value={formData.travelers}
                                                onChange={handleChange}
                                                required
                                                className="w-full h-[56px] px-4 rounded-[10px] bg-white/80 text-black border-none focus:ring-2 focus:ring-primary outline-none text-[1rem]"
                                                placeholder="How many travelers?"
                                            />
                                        </div>

                                        {/* Trip Cost - Col Span 2 */}
                                        <div className="col-span-1 md:col-span-2 lg:col-span-2">
                                            <label className="block mb-2 font-medium text-white text-[16px]">
                                                Estimated Trip Cost *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">$</span>
                                                <input
                                                    type="text"
                                                    name="tripCost"
                                                    value={formData.tripCost}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full h-[56px] pl-8 pr-4 rounded-[10px] bg-white/80 text-black border-none focus:ring-2 focus:ring-primary outline-none text-[1rem]"
                                                    placeholder="Enter trip cost"
                                                />
                                            </div>
                                        </div>

                                        {/* Departure City - Col Span 3 */}
                                        <div className="col-span-1 md:col-span-1 lg:col-span-3">
                                            <label className="block mb-2 font-medium text-white text-[16px]">
                                                Where are you coming from? (US only) *
                                            </label>
                                            <input
                                                type="text"
                                                name="departureCity"
                                                value={formData.departureCity}
                                                onChange={handleChange}
                                                required
                                                className="w-full h-[56px] px-4 rounded-[10px] bg-white/80 text-black border-none focus:ring-2 focus:ring-primary outline-none text-[1rem]"
                                                placeholder="Enter your departure city (US only)"
                                            />
                                        </div>

                                        {/* Destination City - Col Span 3 */}
                                        <div className="col-span-1 md:col-span-1 lg:col-span-3">
                                            <label className="block mb-2 font-medium text-white text-[16px]">
                                                Where are you heading? *
                                            </label>
                                            <input
                                                type="text"
                                                name="destinationCity"
                                                value={formData.destinationCity}
                                                onChange={handleChange}
                                                required
                                                className="w-full h-[56px] px-4 rounded-[10px] bg-white/80 text-black border-none focus:ring-2 focus:ring-primary outline-none text-[1rem]"
                                                placeholder="Enter your destination city"
                                            />
                                        </div>

                                        {/* Button Container - Col Span 6 */}
                                        <div className="col-span-1 md:col-span-2 lg:col-span-6 flex justify-center mt-4 md:mt-6">
                                            <button
                                                type="submit"
                                                disabled={!canSubmit}
                                                className={`get-quote-btn px-8 py-3 text-[18px] font-semibold min-h-[56px] rounded-[30px] ${!canSubmit ? 'opacity-50 cursor-not-allowed grayscale' : ''
                                                    }`}
                                            >
                                                Get My Quote
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .banner-wrapper {
                        background-image: url('/images/pricing/pricing-banner.svg');
                        background-position: left bottom;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }

                    .banner-wrapper::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 255, 255, 0);
                        z-index: 1;
                        border-radius: inherit;
                    }

                    .get-quote-btn {
                        background-color: #fae2d4;
                        color: #333;
                        letter-spacing: 0.5px;
                        transition: all 0.3s ease;
                    }

                    .get-quote-btn:hover:not(:disabled) {
                        background-color: #f5d4c0;
                        transform: translateY(-4px) scale(1.05);
                        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
                    }

                    .get-quote-btn:active:not(:disabled) {
                        transform: translateY(-2px) scale(1.02);
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                    }
                `}</style>
            </div>
        </LocalizationProvider>
    );
};
