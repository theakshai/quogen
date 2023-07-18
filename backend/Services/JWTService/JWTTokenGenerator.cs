﻿using backend.TypeCheckingModel;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class JWTTokenGenerator
    {

        public static dynamic CreateToken(string userId, dynamic? user, IConfiguration configuration)
        {

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                                    new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha512Signature
                                );
            var subject = new ClaimsIdentity(new[]
            {
                new Claim("Email", user?.Email),
                new Claim("UserId", userId),
                new Claim(ClaimTypes.Role,"user"),

            }) ;
            var expires = DateTime.UtcNow.AddDays(2);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;

        }
        public static dynamic CreateAdminToken(string userId, string orgId, IConfiguration configuration)
        {

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                                    new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha512Signature
                                );
            var subject = new ClaimsIdentity(new[]
            {
                new Claim("UserId", userId),
                new Claim("OrgId", orgId),
                new Claim(ClaimTypes.Role,"admin"),

            }) ;
            var expires = DateTime.UtcNow.AddDays(2);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;

        }
        public static dynamic CreateOrgUserToken(string userId, string? email, string orgId, IConfiguration configuration)
        {

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                                    new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha512Signature
                                );
            var subject = new ClaimsIdentity(new[]
            {
                new Claim("Email", email),
                new Claim("UserId", userId),
                new Claim("OrgId", orgId),
                new Claim(ClaimTypes.Role,"member"),

            }) ;
            Console.WriteLine("Calling This with token");
            var expires = DateTime.UtcNow.AddDays(2);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;

        }


    }
}