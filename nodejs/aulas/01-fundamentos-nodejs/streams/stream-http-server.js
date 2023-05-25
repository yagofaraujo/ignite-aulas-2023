import { Transform } from 'node:stream'

import http from 'node:http';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  // Maneira de esperar o "stream" finalizar para pegar todo o conteúdo do stream
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(3334)