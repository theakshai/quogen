using Microsoft.AspNetCore.Mvc.Filters;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomAuth : Attribute, IAuthorizationFilter
    {
        private readonly string _roles;

        public CustomAuth(string roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var token = context.HttpContext.Request.Cookies["jwt"];
            if(token == null)
            {
                context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
                return;
            }
            else
            {
            JWTTokenDecoder jwtTokenDecoder = new JWTTokenDecoder();
            Tuple<JwtHeader, JwtPayload> result = jwtTokenDecoder.TokenDecoder(token);
            var Payload = result.Item2;
            var hasRequiredRole = false;

            foreach (var claim in Payload.Claims)
            {
                if (claim.Value == _roles)
                {
                    hasRequiredRole = true;
                    break;
                }
            }

            if (!hasRequiredRole)
            {
                context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
                return;
            }
            }

        }
    }
}
