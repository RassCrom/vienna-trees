function TreeInfo({ type, year, diam, height, trunk }) {
    return (
        <div className="mb-5">
            <h2 className="mb-2.5">Tree information</h2>
            <div className="flex flex-col gap-2.5">
                <p>Tree name: <span className="text-green-500">{type}</span></p>
                <p>Planting year: <span className="text-green-500">{year}</span></p>
                <p>Diameter: <span className="text-green-500">{diam}</span></p>
                <p>Tree height: <span className="text-green-500">{height}</span></p>
                <p>Trunk size: <span className="text-green-500">{trunk}</span></p>
            </div>
        </div>
    )
}

export default TreeInfo;
