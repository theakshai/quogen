namespace backend.ControllerHelpers
{
    public class JWTToken
    {
        public string? GetToken(HttpContext context)
        {
            string token = context.Items["jwt"].ToString();   
            Console.WriteLine("from class"+token);
            return token;

        }
    }
}
