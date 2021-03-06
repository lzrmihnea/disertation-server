/**
 * Created by Mihnea on 5/2/2015.
 */
module.exports = function(app) {
    // 404s
    app.use(function (req, res, next) {
        res.status(404);

        if(req.accepts('html')) {
            return res.status(200).render('error.jade');
        }

        if(req.accepts('json')) {
            return res.json({error: '' +
            'ot found'});
        }

        // default response type
        res.type('txt');
        res.status(200).send("Hmm, couldn't find that page.");
    })


    // 500
    app.use(function(err, req, res, next) {
        console.error('error at %s\n', req.url, err);
        res.status(500).send("oops, we made a boo boo");
    })
}