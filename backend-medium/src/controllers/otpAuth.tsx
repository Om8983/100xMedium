import * as OTPAuth from "otpauth";

// Create a new TOTP object.
export let totp = new OTPAuth.TOTP({
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA1",
    digits: 6,
    period: 120,
    secret: "NB2W45DFOIZA", // or `OTPAuth.Secret.fromBase32("NB2W45DFOIZA")` or `new OTPAuth.Secret()`
});

// another behaviour that i observed is, no matter how many req you send to the "/getOTP" endpoint once it assigns an otp on first request it remains valid for the specific time, and you will get the same otp until the time is expired... and then a new otp is generated
export const generateOTP = () => {
    const token = totp.generate(); // to generate the token
    let seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period); // to set the countdown until the token changes
    return { token, seconds };
};