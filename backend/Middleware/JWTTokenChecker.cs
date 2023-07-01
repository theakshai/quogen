
using System.Web;

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
            var token = context.Request.Cookies["jwt"];

            /* To print headers for debugging
            IEnumerable<string> keyValues = context.Request.Headers.Keys.Select(key => key + ": " + string.Join(",", context.Request.Headers[key]));
            string requestHeaders = string.Join(System.Environment.NewLine, keyValues);
            Console.WriteLine(requestHeaders);
            */


            context.Items["jwt"] = token;
            await _next(context);
        }

    }
}
