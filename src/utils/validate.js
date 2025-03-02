export const checkValidData = (name, email, password, isSignInForm) => {
    if (!isSignInForm) {
        const isNameValid = /^[A-Za-z\s]{3,}$/.test(name);
        if (!isNameValid) return "Name should be at least 3 characters long and contain only letters and spaces.";
    }

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!isEmailValid) return "Email ID is not valid";

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if (!isPasswordValid) return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";

    return null;
};

