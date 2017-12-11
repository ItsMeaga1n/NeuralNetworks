/**
 * algorytm kohonera - self organizing neural network
 * "Na początek jest chaos"
 * 
 * N - liczba neuronów
 *  neurony ułoone na kracie:   * - * - *
 *                              |   |   |
 *                              * - * - *
 *                              |   |   |
 *                              * - * - *
 * 
 * 0. Losujemy wejscie Wi
 * 1. Losujemy punkt x z danych
 * 2. Znajdź Wj najblizsze do x (oraz być moze sąsiadów)
 *  2.1. Wj = Wj + &(t)(x - Wj) = (1-&(t)Wjx) + &(t)x      |&(t) maleje do zera 
 * 3. repeat to 1
 * 
 * (mexican hat function)
 * ODLEGŁOŚĆ ---> euklidesowa ( xiWj ) = ||x - Wj|| -> norma dla p = 2
 *           ---> (SUM |xi - wj|)^(1/p) -> p-norm
 *           ---> dla max |xi - Wj| -> infinite-norm
 * 
 */