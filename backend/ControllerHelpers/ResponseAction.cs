using Microsoft.AspNetCore.Mvc;

namespace backend.ControllerHelpers
{
    public class ResponseAction
    {
        public ContentResult OK(string msg)
        {
                   var response = new ContentResult
                   {
                       StatusCode = 200,
                       Content = msg,
                       ContentType = "text/plain",
                   };
            return response;

        } 
        public ContentResult NotFound(string msg)
        {
                   var response = new ContentResult
                   {
                       StatusCode = 404,
                       Content = msg,
                       ContentType = "text/plain",
                   };
            return response;

        } 
        public ContentResult ResourceCreated(string msg)
        {
                   var response = new ContentResult
                   {
                       StatusCode = 201,
                       Content = msg,
                       ContentType = "text/plain",
                   };
            return response;

        } 
        public ContentResult InternalServerError()
        {
                   var response = new ContentResult
                   {
                       StatusCode = 500,
                       Content = "Internal Server Error",
                       ContentType = "text/plain",
                   };
            return response;

        } 
        public ContentResult Conflict()
        {
                   var response = new ContentResult
                   {
                       StatusCode = 409,
                       Content = "Resource Already Exists",
                       ContentType = "text/plain",
                   };
            return response;

        } 
        public ContentResult ResourceDeleted(string msg)
        {
                   var response = new ContentResult
                   {
                       StatusCode = 204,
                       Content = msg,
                       ContentType = "text/plain",
                   };
            return response;

        } 
    }
}
