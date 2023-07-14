using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.ControllerHelpers
{
    public class AuthHelper
    {
        public async Task<bool> UserExists(string email, ApplicationDbContext _context)
        {
                try
                {
                    var user = await _context!.Users.FirstOrDefaultAsync(user => user.Email == email);
                    if(user != null)
                    {
                        return true;
                    }

                }catch(Exception ex)
                {
                    return false;
                }
            return false;
        }

        public async  Task<string?> GetUserId(string email, ApplicationDbContext _context)
        {
            try
            {
                var User = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
                if(User != null)
                {
                    return User.UserId;
                }

            }catch(Exception e)
            {
                Console.WriteLine("Error in retreiving UserId. See logs for more information");
                return null;
            }
                return null;


        }
        public async  Task<string?> GetPassword(string? userId, ApplicationDbContext _context)
        {
            if(userId is not null)
            {
            try
            {
                var User = await _context.Authentications.FirstOrDefaultAsync(user => user.UserId == userId);
                if(User != null)
                {
                    return User.Password;
                }

            }catch(Exception e)
            {
                Console.WriteLine("Error in retreiving UserId. See logs for more information");
                return null;
            }
            }
                return null;


        }


    }
}
