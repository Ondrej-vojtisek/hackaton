package cz.moro.hackaton.finbrickshackaton.entity.transactions


class Page {
    var pageNumber = 0
    var pageCount = 0
    var pageSize = 0
    var nextPage = 0
    var links: List<Link>? = null
    var transactions: List<Transaction>? = null


    class Link {
        var rel: String? = null
        var value: String? = null
    }
}
