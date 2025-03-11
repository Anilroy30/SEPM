export const checkValidData = (name, email, password, isSignInForm) => {
    const rules = [
        { 
            condition: !isSignInForm && !/^[A-Za-z\s]{3,}$/.test(name), 
            message: "Name should be at least 3 characters long and contain only letters and spaces." 
        },
        { 
            condition: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), 
            message: "Email ID is not valid" 
        },
        { 
            condition: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), 
            message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character." 
        }
    ];
    
    for (const rule of rules) {
        if (rule.condition) return rule.message;
    }
    return null;
};
