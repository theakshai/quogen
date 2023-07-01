using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text.Json.Nodes;

namespace backend.Services
{
    public class JWTTokenDecoder
    {
        public Tuple<JwtHeader?,JwtPayload?> TokenDecoder(string? token)
        {
            if(token is not null)
            {
             JwtSecurityTokenHandler Handler = new JwtSecurityTokenHandler();
             JwtSecurityToken DecodedToken = Handler.ReadJwtToken(token);
             return Tuple.Create(DecodedToken.Header, DecodedToken.Payload) ;
            }
            return null;
        }

    }
}
