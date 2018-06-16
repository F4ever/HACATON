class Ratio(object):
    Good, LessGood, Normal, LessBad, Bad = 0, 1, 2, 3, 4

    choices = (
        (Good, 'Good'),
        (LessGood, 'LessGood'),
        (Normal, 'Normal'),
        (LessBad, 'LessBad'),
        (Bad, 'Bad'),
    )

    as_dict = dict(choices)
