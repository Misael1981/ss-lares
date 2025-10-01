import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

const ProductsSpecification = ({ product }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Especificações Técnicas</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Marca</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Cor(es)</TableCell>
              <TableCell>
                {product.colors && product.colors.length > 0
                  ? product.colors
                      .map(
                        (color) =>
                          color.charAt(0).toUpperCase() + color.slice(1),
                      )
                      .join(" • ")
                  : "Não informado"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Altura</TableCell>
              <TableCell>{product.height} mm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Largura</TableCell>
              <TableCell>{product.width} mm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Comprimento</TableCell>
              <TableCell>{product.length} mm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Peso</TableCell>
              <TableCell>{product.weight} g</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ProductsSpecification
