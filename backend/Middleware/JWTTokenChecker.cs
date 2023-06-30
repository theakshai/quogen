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

            context.Items["jwt"] = token;
            await _next(context);
        }

    }
}
