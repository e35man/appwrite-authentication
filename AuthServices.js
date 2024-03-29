import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("65bba5142c8c1f5d7ea7")
        this.account = new Account(this.client)
    };
    async createAccount({email,password,name}){
        try {
           const userAccount =  await this.account.create(ID.unique(),email,password,name)
           if (userAccount) {
            //call another method
            this.login({email,password})
           }else{
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }
    async login ({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }
    async getUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;