using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DesafioAPI.Aplicacao
{
    public class GenericoResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool Sucesso { get; set; }
        public string[] Erros { get; set; }
        public object Resultado { get; set; }
        public string Mensagem { get; set; }

        public GenericoResponse(HttpStatusCode statusCode, bool sucesso, string[] erros, object resultado, string mensagem)
        {
            StatusCode = statusCode;
            Sucesso = sucesso;
            Erros = erros;
            Resultado = resultado;
            Mensagem = mensagem;
        }

        public static implicit operator ActionResult(GenericoResponse response)
            => new ObjectResult(response) { StatusCode = (int)response.StatusCode };

        public static GenericoResponse SucessoResponse(object resultado, string mensagem, HttpStatusCode statusCode = HttpStatusCode.OK) 
            => new(statusCode, true, null, resultado, mensagem);

        public static GenericoResponse FalhaResponse(string erro, string mensagem = "Algo deu errado!", object resultado = null, HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
            => FalhaResponse(new string[] { erro }, mensagem, resultado, statusCode);

        public static GenericoResponse FalhaResponse(string[] erros, string mensagem = "Algo deu errado!", object resultado = null, HttpStatusCode statusCode = HttpStatusCode.BadRequest) 
            => new(statusCode, false, erros, resultado, mensagem);
    }
}
