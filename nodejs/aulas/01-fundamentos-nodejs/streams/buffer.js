// Representação de dados que o node utiliza -> Maneira mais otimizada de ler e gravar dados
// Utiliza uma representação mais baixo nível para "transitar" os dados, fazendo com que tenha ganho de performance
// É mais performático "transitar" dados em binário que textos literais, strings, ETC

const buf = Buffer.from("oi")

console.log(buf)