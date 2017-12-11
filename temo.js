//matlab random example

e = E(floor(random()*length(E)) + 1, :);

//network
x1 = [e(1:2),1];
a1 = x1*W1
x2 = [sigmoid(a1),1];
...


//layer3
