include includes/header.pug
  .container.theme-showcase(role='main')
    // Main jumbotron for a primary marketing message or call to action
    .page-header
      h1
        | SocialCoin | Home
      .col-md-6
        verbatim !{qrcode}

include includes/footer.pug
