using DesafioAPI.Dominio.Entidades;
using DesafioAPI.Dominio.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace DesafioAPI.Aplicacao.Comandos.Clientes
{
    public class CadastrarClienteCommand : IRequest<GenericoResponse>, IValidatableObject
    {
        [Required(ErrorMessage = "Necessário informar o nome completo.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Necessário informar o sexo.")]
        public string Sexo { get; set; }

        [Required(ErrorMessage = "Necessário informar a data de nascimento.")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Necessário informar a cidade.")]
        [Range(1, int.MaxValue, ErrorMessage = "Necessário informar a cidade.")]
        public int CidadeId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (DataNascimento.Date > DateTime.Now.Date)
                yield return new ValidationResult("Necessário informar uma data de nascimento válida.", new string[] { nameof(DataNascimento) });

            if (Nome.Trim().Split(" ").Length < 2)
                yield return new ValidationResult("Necessário informar o nome completo.", new string[] { nameof(Nome) });
        }
    }

    public class CadastrarClienteCommandHandler : IRequestHandler<CadastrarClienteCommand, GenericoResponse>
    {
        private readonly ICidadeRepository cidadeRepository;
        private readonly IClienteRepository clienteRepository;

        public CadastrarClienteCommandHandler(
            ICidadeRepository cidadeRepository,
            IClienteRepository clienteRepository
        )
        {
            this.cidadeRepository = cidadeRepository;
            this.clienteRepository = clienteRepository;
        }

        public async Task<GenericoResponse> Handle(CadastrarClienteCommand request, CancellationToken cancellationToken)
        {
            var cidade = await cidadeRepository.ConsultarPorId(request.CidadeId);

            if (cidade is null)
                return GenericoResponse.FalhaResponse("Cidade não localizada.");

            var cliente = new Cliente(request.Nome, request.Sexo, request.DataNascimento, cidade);

            await clienteRepository.Cadastrar(cliente);

            await clienteRepository.SaveChangesAsync();

            return GenericoResponse.SucessoResponse(new { cliente.Id }, "Cliente cadastrado com sucesso.", HttpStatusCode.Created);
        }
    }
}
