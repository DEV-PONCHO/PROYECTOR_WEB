 document.querySelectorAll('#category-filter a').forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.product-card').forEach(card => {
                if(filter === 'all' || card.getAttribute('data-category') === filter){
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });