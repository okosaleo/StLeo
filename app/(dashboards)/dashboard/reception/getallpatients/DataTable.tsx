

export default function DataTable({data}) {
  return (
    <table className="w-full" >
        <tbody>
            <tr className="flex justify-between items-center">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id} className="flex flex-row justify-between items-center">
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.age}</td>
                    <td>{item.height}</td>
                    <td>{item.weight}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}
