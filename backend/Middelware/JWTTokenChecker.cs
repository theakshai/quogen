using Microsoft.IdentityModel.Tokens;

namespace backend.Middleware
{
    public class JWTTokenChecker
    {
        private readonly RequestDelegate _next;

        public JWTTokenChecker(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            string token = null;  
            if(context.Request.Headers.TryGetValue("authorization", out var authorizationHeader))
            {
                 token = authorizationHeader.ToString().Replace("Bearer","").Replace(" ","");
                Console.WriteLine(token);
            }
            context.Items["jwt"] = token;
            await _next(context);
        }

    }
}
