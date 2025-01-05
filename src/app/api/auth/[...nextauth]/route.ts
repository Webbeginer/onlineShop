import  { login, loginWithGoogle } from "@/services/utils/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { data } from "autoprefixer";
import { use } from "react";


const authOpstions: NextAuthOptions={
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET,
    providers:[
        CredentialsProvider({
            name: "cerentials",
            type: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                }
                const user: any = await login({email});
                if(user){
                    const passwordConfirm= await bcrypt.compare(password, user.password);
                    if(passwordConfirm){
                        return user
                    }else{
                        return null
                    }
                }
                
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXT_AUTH_CLIENT_ID_GOOGLE || "",
            clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET_GOOGLE || "",
        })
       
    ],
    callbacks: {
        async jwt({ token, user, account, profile }: any) {
    if (account && user) {
        if(account?.providers === "credentials") {
            token.email= user?.email;
            token.role= user?.role
            token.name= user?.name
            
        }
        if (account.provider === "google") {
            const data = {
                email: user.email,
                name: user.name,
                image: user.image, // Jika Anda ingin menyimpan gambar profil
                type: "google",
            };
            

            const result = await loginWithGoogle(data);
            

            if (result.status) {
                token.email = result.data.email;
                token.role = result.data.role;
                token.name = result.data.name;
            }
        }
    }
           
            return token
        },
        async session({ session, token }: any) {
            if("email" in token){
                session.user.email= token.email;
            }
            if("role" in token){
                session.user.role= token.role;
            }
            if("name" in token){
                session.user.name= token.name;
            }
            return session
        }
    },
    pages:{
        signIn: "/login"
    }
};

const handler= NextAuth(authOpstions);
export { handler as GET, handler as POST };