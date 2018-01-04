export class LoginResponseModel {
    accessToken: string;
    expiresIn: number;
    tokenType: string = "Bearer";
    refreshToken: string;

    constructor(responseFromServer?: any) {
        this.accessToken = responseFromServer.access_token;
        this.expiresIn = responseFromServer.expires_in;
        this.refreshToken = responseFromServer.refresh_token;
    }
}